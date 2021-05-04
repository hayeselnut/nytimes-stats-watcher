import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-04-28')
doc_ref.set({
    'al6155': 20,
    'jj': 25,
    'Adam :))': 24,
    # 'emilyyyyyyyyy': ,
    'swagchamp': 22,
    'Pravin': 42,
    # 'xlpotatoez': ,
    'taro': 33,
    'Hayeselnut': 21,
})