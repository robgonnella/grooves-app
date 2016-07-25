

echo "Script is now starting..."

sleep 2

if ! [[ $DB ]] ;
  then
    echo "You are deleting and restoring your local database"
    echo "To restore MongoLab/Heroku DB add ENV var DB='production'"
fi

sleep 2

echo "Saving Current Working Directory"

cwd=$pwd

sleep 2

echo "Changing to app directory"

cd ~/code/wdi/grooves-app

sleep 2

echo "Saving Variables..."

DELETE_DB_PATH="./helpers/delete_db.js"
SEED_DB_PATH="./helpers/seeds.js"
ADD_ME_PATH="./helpers/add_me_with_records.js"

sleep 2

echo "Now running commands to restore database"

sleep 1

if [[ "$DB" == "production" ]] ;
  then
    echo "Deleting Heroku DB"
    heroku run node $DELETE_DB_PATH
    echo "RE-SEEDING Heroku DB"
    heroku run node $SEED_DB_PATH
    echo "Adding Rob to Heroku DB"
    heroku run node $ADD_ME_PATH
  else
    echo "Deleting Local DB"
    node $DELETE_DB_PATH;
    echo "RE-SEEDING Local DB"
    node $SEED_DB_PATH;
    echo "Adding Rob to Local DB"
    node $ADD_ME_PATH;
fi

echo "Changing back to current working directory"

cd $cwd

echo "process complete!"
