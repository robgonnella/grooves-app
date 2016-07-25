#[Grüv](https://agile-lowlands-5230.herokuapp.com/)

### The Concept and Reason

Vinyl record sales have continued to increase steadily over the past 10 years showing that it is more than just a short lived trend. Vinyl is here to stay. A recent [article](http://www.theverge.com/2015/9/28/9408233/vinyl-sales-ad-supported-streaming-riaa-2015-report) by The Verge has figures showing vinyl sales surpassing ad-supported streaming in 2015.

Grüv functions as a safe reliable marketplace for used vinyl sales. Many vinyl enthusiasts have taken an interest purely for the listening pleasure and not as collectors. This will be the main targeted demographic. These audiophiles often buy the bulk of their collection from used bins at flea markets and other second-hand resources with only a small portion coming from new pressings or high end collectables.

The prices on used vinyl range from $0.50 to around $35 with the majority falling in a $5-$10 range. Low shipping costs and the affordability of used records make Grüv an ideal app to connect audiophiles with flea market vendors across the world and further an existing marketplace.

Payments are made securely and reliably through Paypal, an already trusted source.

A connection through the Discogs API will also give access to brand new records as well.

###Technologies and Features

* MEAN Stack app - for effective processing of large amounts of data
	* MongoDB, Express, Angular, Node
* Paypal API
* Discogs API
* Bootstrap
* AWS S3 bucket for uploading files
* Authentication for Sellers using Webtokens, JWT
* Responsive Design
* Ability to search through records by any two parameters (Artist, Album, Label, Year, Price)

### Future Features
* Randomize Button that displays a random record based on search parameter(s) if given
* Send a message to seller
* Rate sellers by liking their store (positive only no negative)

### Current Issues
* Paypal function not fully implemented as I would need a business account with Paypal to fully integrate a system where a single payment can be dispersed to mutiple paypal accounts.
* Discogs API not implemented yet
* Filter needs to be applied to Artist and Album title lengths to keep the look clean and consistent
* When added to cart, slower fade-out of record instead of disappearing instantly
* After signing up go straight to seller's account page

### API Documentation
![](https://i.imgur.com/D4IDWNf.png)

### Layout

![Home Page](https://i.imgur.com/e8zaGIh.png)
![Account Page](https://i.imgur.com/7b0XDzb.png)
![Cart](https://i.imgur.com/DtXftjK.png)
![Paypal](https://i.imgur.com/AscllYq.png)
