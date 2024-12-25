from flask import Blueprint, request, jsonify
from services.documents import get_all_files, upload_file

documents = Blueprint("documents", __name__)


@documents.route('/upload_file', methods=['GET', 'POST'])
def upload_file_one():
    response = upload_file(request)
    return jsonify(response), 201


@documents.route('/get_files', methods=['GET'])
def get_files():
    username = request.args.get('username')
    files = get_all_files(username)
    return jsonify(files), 200
