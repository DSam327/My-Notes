from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
import io
from rest_framework.parsers import JSONParser
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getnotes(request):
    if request.method == 'GET':
        notes_data=Note.objects.all()
        serializer=NoteSerializer(notes_data, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        print(3)
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= NoteSerializer(data=python_data)
        if serializer.is_valid():
            serializer.save()


@api_view(['GET', 'PUT', 'DELETE'])
def getnote(request, pk):
    if request.method == "GET":
        notes_data=Note.objects.get(id=pk)
        serializer=NoteSerializer(notes_data, many=False)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        json_data=request.body
        stream=io.BytesIO(json_data)
        python_data=JSONParser().parse(stream)
        serializer= NoteSerializer(python_data)
        stu=Note.objects.get(id=pk)
        serializer=NoteSerializer(stu, data=python_data, partial=True)
        if serializer.is_valid():
            serializer.save()

    if request.method =='DELETE':
        notes_data=Note.objects.get(id=pk)
        notes_data.delete()