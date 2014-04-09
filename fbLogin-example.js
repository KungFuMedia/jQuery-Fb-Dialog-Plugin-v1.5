jQuery(document).ready(function($) {

	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire
			if (response.authResponse) {
				$('#user-message').html('Velkommen tilbake, henter nå din informasjon...');
				//console.log('Welcome back!  Fetching your information.... ');
				FB.api('/me', function(response) {
					//alert('Velkommen tilbake, ' + response.first_name + '! :)');
					$('#user-message').html('Velkommen tilbake, ' + response.first_name + '! :)');
				});
			}
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
		} else if (response.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app
			FB.login(function(response) {
				if (response.authResponse) {
					$('#user-message').html('Velkommen, henter nå din informasjon...');
					//console.log('Welcome!  Fetching your information.... ');
					FB.api('/me', function(response) {
						//alert('Good to see you, ' + response.name + '.');
						$('#user-message').html('Hyggelig å se deg, ' + response.first_name + '! Dette er første gang du logger inn.');
					});
					var uid = response.authResponse.userID;
					var accessToken = response.authResponse.accessToken;
				} else {
					$('#user-message').html('Du har kanselerte påloggingen eller så ble autorisasjonen ikke fullført...');
					//alert('User cancelled login or did not fully authorize.');
				}
			});
		} else {
			// the user isn't logged in to Facebook.
		}
	});

	$('.feed-post-dialog').fbDialog(null, function(response) {
		if (response && response.post_id) {
			alert('Post was published.');
		} else {
			//alert('Post was not published.');
			/* make the API call */
			FB.api('/me', function(response) {
				alert('Fy på deg ' + response.first_name + ', du skal jo ikke avbryte! ;).');
			});
		}
	});

});
