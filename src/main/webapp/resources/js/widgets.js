/* 
 * Javascript to create the necessary HTML, CSS and JS for our widgets
 */

var scriptSource = (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1].src
}());

var params = parseQueryString(scriptSource.split('?')[1]);

params.alias; // Dataverse Alias
params.dvHost; // Dataverse Installation Name
params.dvUrl; // Dataverse Installation URL
params.widget; // Widget type
params.heightPx; // iframe height in pixels
params.text; // search input placeholder text

// Utility function to convert "a=b&c=d" into { a:'b', c:'d' }
function parseQueryString(queryString) {
    var params = {};
    var pl     = /\+/g;
    if (queryString) {
        var keyValues = queryString.split('&');
        for (var i=0; i < keyValues.length; i++) {
            var pair = keyValues[i].split('=');
            params[pair[0]] = pair[1].replace(pl, " ");
        }
    }
    return params;
}

if(params.widget === 'search') {
    /*
    * Dataverse Search Box
    */
   document.write('<input type="text" placeholder="' + params.text + '..." onkeydown="if (event.keyCode == 13) document.getElementById(\'btnDataverseSearch\').click()" style="background:#fff; border:1px solid #ccc; border-radius:3px; box-shadow:0 1px 1px rgba(0, 0, 0, 0.075) inset; padding:4px; min-width:180px;"/>&#160;<input id="btnDataverseSearch" value="Find" type="button" onclick="window.open(&#39;' + params.dvUrl + '/dataverse.xhtml?alias=' + params.alias + '&amp;q=&#39; + this.previousSibling.previousSibling.value + &#39;&#39;, &#39;_blank&#39;);" style="-moz-border-bottom-colors:none; -moz-border-left-colors:none; -moz-border-right-colors:none; -moz-border-top-colors:none; background-color:#f5f5f5; background-image:-moz-linear-gradient(center top , #ffffff, #e6e6e6); background-repeat:repeat-x; border:1px solid #ccc; border-color:#e6e6e6 #e6e6e6 #b3b3b3; border-image:none; border-radius:4px; box-shadow:0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05); color:#333; cursor:pointer; text-shadow:0 1px 1px rgba(255, 255, 255, 0.75); padding:0.3em 1em; line-height:1.4;" />');
}

if(params.widget === 'iframe' && params.dvHost || 0 === params.dvHost.length) {
    /*
     * Dataverse Listing iFrame w/ Host Name
     */
    document.write('<div><p style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;"><a href="' + params.dvUrl + '" target="_blank" title="{Root} Dataverse">{Root} Dataverse</a> <span style="color:#b3b3b3;">&gt;</span> <a href="' + params.dvUrl + '/dataverse/' + params.alias + '" target="_blank" title="{' + params.alias + '} Dataverse"><b>{' + params.alias + '} Dataverse</b></a></p></div><iframe src="' + params.dvUrl + '/iframe/' + params.alias + '" width="100%" height="' + params.heightPx + '" style="padding:4px; border:0; background:url(' + params.dvUrl + '/resources/images/ajax-loading.gif) no-repeat 50% 50%;"></iframe><div style="display:table;width:100%;"><div style="float:left;width:50%;"><p style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;color:#808080;">Data stored in the <a style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;color:#337ab7;" href="' + params.dvUrl + '" title="' + params.dvHost + '" target="_blank">' + params.dvHost + '</a>.</p></div><div style="float:left;width:50%;text-align:right;"><span style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;color:#808080;margin-right:6px;">Powered by</span><a target="_blank" title="The Dataverse Project" href="http://dataverse.org/"><img style="vertical-align:middle;" src="' + params.dvUrl + '/resources/images/dataverseproject_logo.jpg" alt="The Dataverse Project"/></a></div></div>');
} else if(params.widget === 'iframe' && !params.dvHost || 0 === params.dvHost.length) {
    /*
     * Dataverse Listing iFrame w/o Host Name
     */
    document.write('<div><p style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;"><a href="' + params.dvUrl + '" target="_blank" title="{Root} Dataverse">{Root} Dataverse</a> <span style="color:#b3b3b3;">&gt;</span> <a href="' + params.dvUrl + '/dataverse/' + params.alias + '" target="_blank" title="{' + params.alias + '} Dataverse"><b>{' + params.alias + '} Dataverse</b></a></p></div><iframe src="' + params.dvUrl + '/iframe/' + params.alias + '" width="100%" height="' + params.heightPx + '" style="padding:4px; border:0; background:url(' + params.dvUrl + '/resources/images/ajax-loading.gif) no-repeat 50% 50%;"></iframe><div style="display:table;width:100%;"><div style="float:left;width:50%;"><p><!-- empty --></p></div><div style="float:left;width:50%;text-align:right;"><span style="font: 12.25px Helvetica Neue,Helvetica,Arial,sans-serif;color:#808080;margin-right:6px;">Powered by</span><a target="_blank" title="The Dataverse Project" href="http://dataverse.org/"><img style="vertical-align:middle;" src="' + params.dvUrl + '/resources/images/dataverseproject_logo.jpg" alt="The Dataverse Project"/></a></div></div>');
}
