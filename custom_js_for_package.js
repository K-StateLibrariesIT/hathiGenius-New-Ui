(function () {
    "use strict";
    'use strict';

    app.component('prmSearchResultAvailabilityLineAfter', {
        bindings: { parentCtrl: '<' },
        controller: 'prmSearchResultAvailabilityLineAfterController'
    });

    app.controller('prmSearchResultAvailabilityLineAfterController', function ($scope) {

    /* Begin Hathi Genius */
    /* Bengtson-Fu 13 3 |\| ( ][ 5 () |\| - |= |_|!!!!!! */
    /*created by Jason Bengtson, MLIS, MA for K-State Libraries ITS: Available under GNU GPL license*/
    /* Bengtson-Fu is the best Kung Fu!!! */
    /* Built for Kansas State University -- Go Wildcats!!! */
    /* hathiGenius-----an app built to determine availability of hathitrust materials */

        function rewrite(datareturn)
        {
            $.each(datareturn, function ( i, val ) {
                var datext="Not Available Online";
                var daclass="info";
                if (val.article.indexOf("StatusAvailable")>0) {
                    datext="Available Online";
                    daclass="fulltext_linktorsrc";
                }
                $("#"+val.ident).find("span.button-content>span").attr("class","").addClass(val.article).addClass(daclass).text(datext);
            });
        }

        function rewriteFailure(datareturn)
        {
            $.each(datareturn, function ( i, val ) {
                var datext="Check Availability";
                var daclass="info";
                if (val.article.indexOf("StatusAvailable")>0) {
                    datext="Available Online";
                    daclass="fulltext_linktorsrc";
                }
                $("#"+val.ident).find("span.button-content>span").attr("class","").addClass(val.article).addClass(daclass).text(datext);
            });
        }

        function hathiFix()
        {
            var datasink=new Array();
            var x=0;
            $("div.list-item-primary-content").each(function (i, obj) {
                var linko=$(obj).find("span.urlToXmlPnx").attr("data-url")+"";

                if (linko.indexOf("TN_hathi_trust")>-1) {
                    $(obj).find("span.availability-status.fulltext_linktorsrc").text("Checking Holdings . . .");
                    var tooler=Math.floor((Math.random() * 99000) + 10000);
                    $(obj).attr("id","newid"+tooler);

                    datasink[x]=new Object();
                    var uriarray = linko.split('/');
                    var sizeit=uriarray.length-1;
                    var disuri=uriarray[sizeit];
                    var isit=disuri.indexOf("?");
                    if (isit>-1) {
                        disuri=disuri.substring(0,isit);
                    }

                    datasink[x].ident=$(obj).attr("id");
                    datasink[x].article=disuri.replace("TN_hathi_trust", "");

                    x++;
                }

            });

            var sendo=JSON.stringify(datasink);
             $.ajax({
                    dataType: "json",
                    url: "https://PATH TO HATHILOOKUP.PHP?datasink="+sendo,
                    success: function (data) {
                        rewrite(data);
                    },
                    error: function (xhr, status, error) {
                        rewriteFailure(datasink);
                    }
                });
        }

        // Setup a new observer to get notified of changes
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                $(mutation.target).find('div.last-item').text(function (_, txt) {
                    hathiFix();
                })
            });
        });

        // Observe a specific DOM node / subtree
        observer.observe($('.main')[0], {
            childList: true
        });

        $(".list-item-wrapper").click(function () {
            setTimeout(hathiFix(), 800);
        });

        hathiFix();
        /* End HathiGenius */

    })
});
