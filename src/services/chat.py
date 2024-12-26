import base64
import os
import vertexai
from documents import get_all_files, download_file
from google.oauth2 import service_account
from vertexai.generative_models import GenerativeModel, SafetySetting, Part

def initialize_conversation(username):
    pass


def chat(username):
    files = get_all_files(username)
    for file in files[0]:
        download_file(username, file)
        
    file_pathes = [os.path.join(username, file) for file in files[0]]
    
    encoded_data = []
    
    for file_path in file_pathes:
        with open(file_path, "rb") as file:
            file_content = file.read()
            encoded_data.append(base64.b64encode(file_content).decode('utf-8'))
    
    multiturn_generate_content(encoded_data)


def multiturn_generate_content(encoded_data):
    credentials = service_account.Credentials.from_service_account_file("this-project-must-work-036f997d9a8a.json")
    vertexai.init(project="this-project-must-work", location="us-central1", credentials=credentials)
    
    textsi_1 = """אתה יועץ זכויות מבוטחים. אתה מקבל קובץ PDF המכיל את תנאי הביטוח הרפואי של מבוטח מסוים. משתמשים ישאלו אותך שאלות על זכויותיהם לפי תנאי הביטוח. עליך לענות אך ורק על סמך המידע המופיע ב-PDF. אם השאלה אינה ניתנת לעינה על סמך ה-PDF, ענה: \"אני מצטער, המידע אינו זמין בתיעוד שסופק\". תן תשובות קצרות, ברורות ותמציתיות."""
    
    documents = [Part.from_data(mime_type="application/pdf", data=encoded_file_data)
                 for encoded_file_data in encoded_data]

    model = GenerativeModel(
        "gemini-1.5-flash-002",
        system_instruction=[textsi_1]
    )
    
    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 1,
        "top_p": 0.95,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
    ]
    
    chat = model.start_chat()
    
    response = chat.send_message(
        [*documents, """לאיזה קצבה יהיה זכאי מבוטח אשר נזקק להשתלה ובשל מצבו הרפואי מרותק למיטתו?"""],
        generation_config=generation_config,
        safety_settings=safety_settings
    )
    print(response.candidates[0].content.parts[0].text)


# chat("try")



import socket
import threading
import base64
import os
from google.generativeai.client import SafetySetting, Part
import vertexai
from vertexai.generative_models import GenerativeModel
from google.oauth2 import service_account

# Load PDF data once at server startup. You'll need to adapt this loading logic as needed
def load_pdf_data():
  with open('policy.pdf', "rb") as pdf_file:
        encoded_file_data = base64.b64encode(pdf_file.read()).decode()
  return [encoded_file_data]


def multiturn_generate_content(encoded_data, query, chat_instance):
    
    documents = [Part.from_data(mime_type="application/pdf", data=encoded_file_data.encode())
                 for encoded_file_data in encoded_data]

    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 1,
        "top_p": 0.95,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
    ]
    
    response = chat_instance.send_message(
        [*documents, query],
        generation_config=generation_config,
        safety_settings=safety_settings
    )
    return response.candidates[0].content.parts[0].text

def handle_client(client_socket, pdf_data, model):
    chat = model.start_chat()
    while True:
        try:
            data = client_socket.recv(1024).decode() # Receive up to 1024 bytes, decode to text
            if not data:
                break # If there's no more data, the client has disconnected
            
            print(f"Received message: {data}")

            response_text = multiturn_generate_content(pdf_data, data, chat)
            
            client_socket.send(response_text.encode()) # Send back response (encode it)
        except ConnectionResetError:
          print("Client Disconnected")
          break
    client_socket.close()

def run_server():
    textsi_1 = """אתה יועץ זכויות מבוטחים. אתה מקבל קובץ PDF המכיל את תנאי הביטוח הרפואי של מבוטח מסוים. משתמשים ישאלו אותך שאלות על זכויותיהם לפי תנאי הביטוח. עליך לענות אך ורק על סמך המידע המופיע ב-PDF. אם השאלה אינה ניתנת לעינה על סמך ה-PDF, ענה: "אני מצטער, המידע אינו זמין בתיעוד שסופק". תן תשובות קצרות, ברורות ותמציתיות."""

    credentials = service_account.Credentials.from_service_account_file("this-project-must-work-036f997d9a8a.json")
    vertexai.init(project="this-project-must-work", location="us-central1", credentials=credentials)
    
    model = GenerativeModel(
        "gemini-1.5-flash-002",
        system_instruction=[textsi_1]
    )
    
    HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
    PORT = 65432        # Port to listen on (non-privileged ports are > 1023)
    pdf_data = load_pdf_data() # load PDF once when the server starts
    
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        print(f"Server listening on {HOST}:{PORT}")
        while True:
            conn, addr = s.accept()
            print(f"Connected by {addr}")
            client_thread = threading.Thread(target=handle_client, args=(conn, pdf_data, model))
            client_thread.start()

if __name__ == "__main__":
    run_server()
