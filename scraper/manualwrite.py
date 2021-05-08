import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-05-08')
doc_ref.set({
    # 'al6155': ,
    'jj': 185,
    'Adam :))': 110,
    'emilyyyyyyyyy': 216,
    # 'swagchamp': ,
    'Pravin': 214,
    'xlpotatoez': 107,
    'taro': 238,
    'Hayeselnut': 373,
    # 'Daph': ,
})