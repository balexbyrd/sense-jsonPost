# sense-getCurrentSelections
Create a JSON AJAX post to send data to a web service or JSON db (CouchDB, MongoDB etc.)

![Screenshot](https://raw.githubusercontent.com/balexbyrd/img/master/getCurrentSelections_JSON.PNG)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/img/master/getCurrentSelections_definitions.PNG)
![Screenshot](https://raw.githubusercontent.com/balexbyrd/img/master/getCurrentSelections_post.PNG)

## Installation

1. Move getCurrentSelections to the default extension folder in Qlik Sense
2. Open Qlik Sense and add getCurrentSelections extension to a sheet
3. Configure properties (JSON URL, Button Name)

	* **JSON URL** - This URL is the web service or database(couchDB, MongoDB etc.) you're posting the data to. Default: http://jsonplaceholder.typicode.com/posts
	* **Button Name** - the name of the button in the UI

> **More Info** <http://api.jquery.com/jquery.post/> and <https://github.com/typicode/jsonplaceholder#how-to>
	
## Usage

When the button is pressed, Qlik Sense generates a JSON post using the current selections and posts the data to the URL.

Behind the scenes, the .getList('Current Selections',..) api function is called > an array is created with the response > JSON.stringify the array > AJAX Post

## Limitations

I've tested this in Qlik Sense 2.1.1 and it works in Google Chrome. 

### If posting to a web service, the web service must be set up to receive the JSON string (it's not plug and play). If using CouchDB or MongoDB etc., additional code will be needed to connect to the db.

### Check the console in the browser to see what gets posted

## License

MIT
