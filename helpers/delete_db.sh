

echo "Script is now starting..."

sleep 3

echo "Saving Directory to Variable..."

PATH_TO_FILE="$HOME/code/wdi/grooves-app/helpers/delete_db.js"

sleep 3

echo "This is the path to the file $PATH_TO_FILE"

sleep 2

echo "Now running heroku command to delete mongoLab database"

heroku run node $PATH_TO_FILE

echo "process complete!"
