from pymongo import MongoClient
from datetime import datetime
from typing import Optional, Dict, Any
from config import MONGO_URI, DB_NAME, COLLECTIONS, USERS_ORDER, WATER_ORDER
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
        if duty_type == 'water':
            current_person = WATER_ORDER[duty['current_index']]
            next_person = WATER_ORDER[(duty['current_index'] + 1) % len(WATER_ORDER)]
        else:
            current_person = USERS_ORDER[duty['current_index']]
            next_person = USERS_ORDER[(duty['current_index'] + 1) % len(USERS_ORDER)]
        
        return {
            'current': current_person,
            'next': next_person,
            'last_updated': duty['last_updated']
        }

    def update_duty(self, duty_type: str, user_id: Optional[int] = None) -> Dict[str, Any]:
        """Update duty to next person in order"""
        duty = self.db[COLLECTIONS['duties']].find_one({'type': duty_type})
        order = WATER_ORDER if duty_type == 'water' else USERS_ORDER
        next_index = (duty['current_index'] + 1) % len(order)
        
        self.db[COLLECTIONS['duties']].update_one(
            {'type': duty_type},
            {
                '$set': {
                    'current_index': next_index,
                    'last_updated': datetime.now()
                }
            }
        )
        
        return self.get_current_duty(duty_type)

    def get_all_duties(self) -> Dict[str, Dict[str, str]]:
        """Get current status for all duties"""
        duties = {}
        for duty in self.db[COLLECTIONS['duties']].find():
            current_index = duty['current_index']
            if duty['type'] == 'water':
                order = WATER_ORDER
            else:
                order = USERS_ORDER
            
            duties[duty['type']] = {
                'current': order[current_index],
                'next': order[(current_index + 1) % len(order)]
            }
        return duties

    def set_duty_index(self, duty_type: str, person_name: str) -> Dict[str, Any]:
        """Set the current index for a duty type to point to a specific person"""
        order = WATER_ORDER if duty_type == 'water' else USERS_ORDER
        try:
            new_index = order.index(person_name)
            self.db[COLLECTIONS['duties']].update_one(
                {'type': duty_type},
                {
                    '$set': {
                        'current_index': new_index,
                        'last_updated': datetime.now()
                    }
                }
            )
            return self.get_current_duty(duty_type)
        except ValueError:
            raise ValueError(f"Person {person_name} not found in {duty_type} order") 