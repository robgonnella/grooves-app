

echo "Script is now starting..."

sleep 2

echo "Saving Current Working Directory"

cwd=$pwd

sleep 2

echo "Changing to app directory"

cd ~/code/wdi/grooves-app

sleep 2

echo "Saving Variables..."

DELETE_DB_PATH="./helpers/delete_db.js"
ADD_ME_PATH="./helpers/add_me_with_records.js"
SEED_DB_PATH="./helpers/seeds.js"

sleep 2

echo "Now running heroku command to restore mongoLab database"

sleep 1

echo "Deleting DB"
heroku run node $DELETE_DB_PATH
echo "Adding Rob"
heroku run node $ADD_ME_PATH
echo "RE-SEEDING DB"
heroku run node $SEED_DB_PATH

echo "Changing back to current working directory"

cd $cwd

echo "process complete!"
