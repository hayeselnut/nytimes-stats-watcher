import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use the application default credentials
cred = credentials.Certificate("./nytimes-stats-watcher-firebase-adminsdk-kb436-ca4786d665.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'nytimes-stats-watcher',
})

db = firestore.client()

doc_ref = db.collection('leaderboards').document('2021-05-05')
doc_ref.set({
    'al6155': 28,
    'jj': 71,
    'Adam :))': 38,
    'emilyyyyyyyyy': 149,
    'swagchamp': 82,
    'Pravin': 74,
    # 'xlpotatoez': ,
    'taro': 45,
    'Hayeselnut': 233,
})