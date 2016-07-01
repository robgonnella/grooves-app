

echo "Script is now starting..."

sleep 2

echo "Saving Current Working Directory"

cwd=$pwd

sleep 2

echo "Changing to app directory"

cd ~/code/wdi/grooves-app

sleep 2

echo "Saving Directory to Variable..."

PATH_TO_FILE="./helpers/delete_db.js"

sleep 3

echo "This is the path to the file $PATH_TO_FILE"

sleep 2

echo "Now running heroku command to delete mongoLab database"

heroku run node $PATH_TO_FILE

echo "Changing back to current working directory"

cd $cwd

echo "process complete!"
