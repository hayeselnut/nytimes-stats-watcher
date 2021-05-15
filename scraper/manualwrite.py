import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-05-09')
doc_ref.set({
    'al6155': 43,
    'jj': 69,
    'Adam :))': 61,
    # 'emilyyyyyyyyy': ,
    'swagchamp': 49,
    'Pravin': 45,
    'xlpotatoez': 55,
    'taro': 229,
    'Hayeselnut': 43,
    # 'Daph': ,
})