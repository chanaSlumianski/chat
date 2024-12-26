import dropbox
import os
from dotenv import load_dotenv

load_dotenv()


def dropbox_connect():
    dbx = dropbox.Dropbox(os.getenv("ACCESS_TOKEN"))
    return dbx


def list_files_in_folder(folder_path):
    dbx = dropbox_connect()
    try:
        files = dbx.files_list_folder(folder_path)
        file_list = [entry.name for entry in files.entries if isinstance(entry, dropbox.files.FileMetadata)]
        return file_list
    except dropbox.exceptions.ApiError as e:
        print(f"Error accessing Dropbox folder: {e}")
        return []
 
   
def is_file_exist(username, file_name):
    path = os.path.join("/", username)
    files = list_files_in_folder(path)
    if file_name in files:
        return True
    return False


def upload_file(data):
    dbx = dropbox_connect()
    try:
        username = data.args.get('username')
        
        file = data.files.get('fileToUpload')

        if file.filename == '':
            return ({'error': 'No selected file'}), 400
        
        if file:
            filename = file.filename
            if is_file_exist(username, filename):
                return (({'error': 'This file is exist'}), 409)
            
            local_path = "/" + username
            file.save(local_path)
            document_path = os.path.join("/", username, filename)
            print(document_path)
            with open(local_path, "rb") as f:
                dbx.files_upload(f.read(), document_path)
            
            return True, 200
        
    except Exception as e:
        return f'Error uploading file: {str(e)}'


def get_shared_link(url):
    try:
        dbx=dropbox_connect()
        shared_link_metadata = dbx.sharing_list_shared_links(path=url,direct_only=True)
        if(shared_link_metadata.links==[]):
            return create_shared_link(url)
        return shared_link_metadata.links[0].url
    except Exception as e:
        print(f"Error: {e}")


def create_shared_link(file_path):
    try:
        dbx=dropbox_connect()
        shared_link = dbx.sharing_create_shared_link_with_settings(file_path)
        return shared_link.url
    except dropbox.exceptions.ApiError as e:
        return e
    except Exception as e:
        print(f"Error: {e}")


def get_all_files(username):
    folder = "/" + username
    file_names = list_files_in_folder(folder)
    file_links = [get_shared_link(os.path.join(folder, file_name)) for file_name in file_names]
    return file_names, file_links
