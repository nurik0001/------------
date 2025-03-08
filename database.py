from pymongo import MongoClient
from datetime import datetime
from typing import Optional, Dict, Any
from config import MONGO_URI, DB_NAME, COLLECTIONS, USERS_ORDER
import time

class Database:
    def __init__(self):
        self.client = None
        self.db = None
        self._connect_with_retry()

    def _connect_with_retry(self, max_retries=5):
        """Try to connect to MongoDB with retries"""
        for attempt in range(max_retries):
            try:
                self.client = MongoClient(MONGO_URI)
                # Test the connection
                self.client.server_info()
                # Select the specific database after successful authentication
                self.db = self.client[DB_NAME]
                self._setup_collections()
                print("Successfully connected to MongoDB")
                return
            except Exception as e:
                print(f"Failed to connect to MongoDB (attempt {attempt + 1}/{max_retries}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2)  # Wait 2 seconds before retrying
                else:
                    print("Could not connect to MongoDB after multiple attempts")
                    raise

    def _setup_collections(self):
        """Initialize collections if they don't exist"""
        try:
            if COLLECTIONS['duties'] not in self.db.list_collection_names():
                self.db[COLLECTIONS['duties']].insert_many([
                    {'type': 'food', 'current_index': 0, 'last_updated': datetime.now()},
                    {'type': 'water', 'current_index': 0, 'last_updated': datetime.now()},
                    {'type': 'trash', 'current_index': 0, 'last_updated': datetime.now()}
                ])
        except Exception as e:
            print(f"Error setting up collections: {e}")
            raise

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