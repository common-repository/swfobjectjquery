var swfcounter = 0;

jQuery('object').each(function() {
	var type = jQuery(this).attr('type');
	var classid = jQuery(this).attr('classid');
	var ignore = jQuery(this).attr('ignore');
        if(type != "application/x-shockwave-flash" && classid != "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" && ignore != "yes") {
            var isFlash = false;
            jQuery(this).children('embed').each(function() {
                if(jQuery(this).attr('type') == "application/x-shockwave-flash") {
                    isFlash = true;
                }
            });
            if(isFlash == false) {
                var swfExtension = new RegExp('.swf(?){1}(.){0,}$','i');
                jQuery(this).children('param').each(function() {
                    if(jQuery(this).attr('name') == "movie") {
                        var movie = jQuery(this).attr('value');
                        var match = movie.match(swfExtension);
                        if(match != null) {
                            isFlash = true;
                        }
                    }
                });
            }
            if(isFlash) {
                type = "application/x-shockwave-flash";
                jQuery(this).attr('type', type);
            }
        }
	if((type == "application/x-shockwave-flash" || classid == "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000") && ignore != "yes") {
		swfcounter++;
		var swfid = jQuery(this).attr('id');
		if(swfid == "") {
			swfid = 'swfobject-' + swfcounter;
			jQuery(this).attr('id', swfid);
		}
		swfobject.registerObject(swfid, "9.0.115");
		jQuery(this).children('object').each(function() {
			jQuery(this).attr('ignore', 'yes');
		});
	}
});

jQuery('object').each(function() {
	jQuery(this).removeAttr('ignore');
});