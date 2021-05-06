import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-05-06')
doc_ref.set({
    'al6155': 17,
    'jj': 117,
    'Adam :))': 50,
    'emilyyyyyyyyy': 116,
    'swagchamp': 38,
    'Pravin': 24,
    'xlpotatoez': 34,
    'taro': 103,
    'Hayeselnut': 148,
})