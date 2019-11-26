# hathiGenius-New-Ui
A version of hathiGenius designed to work in the new Primo UI


!!!Built by K-State Libraries ITS for K-State Libraries!!!

This application is designed to fix rights information for HathiTrust entries in the NewUI version of Primo. Built as an evolution of the hathiGenius application for old Primo.

This application populates rights infor based on free materials accourding to USRightsString in the Hathi Trust Bibliographic API. To make more granular rights determinations from the JSON the api delivers, change the checking and conditionals within the hathilookup.php file.

The hathilookup.php file should be saved to an application server in a directory location that makes it accessible to JavaScript in your Primo installation.

The javascript in the "custom_js_for_package.js" file must be inserted in the custom.js Primo package. It may either be inserted in the anonymous function provided, or the code within can be added to an existing anonymous function. If integrating with browzine, the main code for browzine should be outside of the app.controller, with a single directive calling the browzine inside the app.controller, like so:

```javascript
window.browzine.primo.searchResult($scope);
```

hathiGenius and the browzine actuator need to share the same controller, with the browzine directive appearing immediately after the first app.controller line

jQuery must be added to Primo's UI (it is no longer present by default) in a first anonymous function (for ex.:

```javascript
(function()  {
            /* Load jQuery */
            var jquerymini = document.createElement("script");
            jquerymini.type = "text/javascript";
            jquerymini.async = true;
            jquerymini.src = "https://code.jquery.com/jquery-2.2.4.min.js";
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(jquerymini, c); 
    
})();
```
