from pymongo import MongoClient
from datetime import datetime
from typing import Optional, Dict, Any
from config import MONGO_URI, DB_NAME, COLLECTIONS, USERS_ORDER

class Database:
    def __init__(self):
        self.client = MongoClient(MONGO_URI)
        self.db = self.client[DB_NAME]
        self._setup_collections()

    def _setup_collections(self):
        """Initialize collections if they don't exist"""
        if COLLECTIONS['duties'] not in self.db.list_collection_names():
            self.db[COLLECTIONS['duties']].insert_many([
                {'type': 'food', 'current_index': 0, 'last_updated': datetime.now()},
                {'type': 'water', 'current_index': 0, 'last_updated': datetime.now()},
                {'type': 'trash', 'current_index': 0, 'last_updated': datetime.now()}
            ])

    def get_current_duty(self, duty_type: str) -> Dict[str, Any]:
        """Get current person responsible for duty"""
        duty = self.db[COLLECTIONS['duties']].find_one({'type': duty_type})
        current_person = USERS_ORDER[duty['current_index']]
        next_person = USERS_ORDER[(duty['current_index'] + 1) % len(USERS_ORDER)]
        return {
            'current': current_person,
            'next': next_person,
            'last_updated': duty['last_updated']
        }

    def update_duty(self, duty_type: str, user_id: int) -> Dict[str, Any]:
        """Update duty status and return new responsible person"""
        duty = self.db[COLLECTIONS['duties']].find_one({'type': duty_type})
        new_index = (duty['current_index'] + 1) % len(USERS_ORDER)
        
        self.db[COLLECTIONS['duties']].update_one(
            {'type': duty_type},
            {
                '$set': {
                    'current_index': new_index,
                    'last_updated': datetime.now()
                }
            }
        )

        return {
            'current': USERS_ORDER[new_index],
            'next': USERS_ORDER[(new_index + 1) % len(USERS_ORDER)]
        }

    def get_all_duties(self) -> Dict[str, Dict[str, str]]:
        """Get current status for all duties"""
        duties = {}
        for duty in self.db[COLLECTIONS['duties']].find():
            current_index = duty['current_index']
            duties[duty['type']] = {
                'current': USERS_ORDER[current_index],
                'next': USERS_ORDER[(current_index + 1) % len(USERS_ORDER)]
            }
        return duties 