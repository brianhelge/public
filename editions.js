	$( document ).ready(function() {

		var $sF = $("#edition-searchForm"),
		domain = document.domain,
		domainchop = 'blah';
		if($sF.length === 0) {
			$('body').prepend(buildSearchForm());
			bindSearchForm();
		}
		else {
			$sF.slideDown('slow');
		}

		if (domain.indexOf('.com') > -1){
			domainchop = domain.substring(domain.indexOf('.com')+1);
		}

		function buildSearchForm() {
			var locals = ['local.espn.go.com', 'local.espn.co.uk', 'local.espndeportes.com', 'local.espn.com.mx', 'local.espn.com.ar', 'local.espn.com.ve', 'local.espn.com.co', 'local.espn.com.cl'],
				qas = ['espn-qa.go.com', 'qa.espn.co.uk', 'qa.espndeportes.com', 'qa.espn.com.mx', 'qa.espn.com.ar', 'qa.espn.com.ve', 'qa.espn.com.co', 'qa.espn.cl'],
				texts = ['ESPN', 'UK', 'Deportes', 'Mexico', 'Argentina', 'Venezuela', 'Columbia', 'Chile'],
				stringbuilder = '';



			stringbuilder += '<form id="edition-searchForm" style="background-color:#FFF; position:fixed; z-index:200; top:0; left:50%; margin-left: -235px; width:440px; text-align:center; padding:15px; height:auto; line-height:25px; box-shadow:0px 0px 5px #333; border:1px solid #888; z-index:1000000000;">'
					+ 'Select environment: '
					+ '<input type="radio" value="local" name="environment" checked="checked" style="display:none" id="local" /> <label for="local">Local</label> | '
					+ '<input type="radio" value="qa" name="environment" style="display:none" id="qa" /> <label for="qa">QA</label><br/><br/>'
					+ 'Select edition:<br/>';

					for (i=0; i<locals.length; i++){
						var checked = '',
						showchecked = false;

						if (domain == locals[i] || domain == qas[i]){
							showchecked = true;
						}
						else if (domainchop && domainchop !== 'com' && (locals[i].indexOf(domainchop) > -1 || qas[i].indexOf(domainchop) > -1)){
							showchecked = true;
						}
						else if (domainchop === 'com' && i === 0){
							showchecked = true;
						}
						if (showchecked){
							checked = ' checked="checked"';
						}
						stringbuilder += '<input type="radio" value="' + locals[i] + '" rel="' + qas[i] + '" name="edition" style="display:none" ' + checked + ' id="' + texts[i].toLowerCase() + '" /> <label for="' + texts[i].toLowerCase() + '">' + texts[i] + '</label><br/>'
					}

					stringbuilder += '<input type="submit" value="Submit" style="margin-right:10px;"/>'
					+ '<input id="edition-closeButton" type="button" value="Close"/>'
				+ '</form>';

				return stringbuilder;
		}

		function bindSearchForm() {
			var $sF = $("#edition-searchForm");
			$sF.on("submit", function(e) {
				e.preventDefault();
				$sF.slideUp('slow');
				searchAndGo();
			}).on("click", "#edition-closeButton", function() {
				$sF.slideUp('slow');
			});
		}

		function searchAndGo() {
			window.console.log(url);
			var localVal = $('input[name=edition]:checked', '#edition-searchForm').val() || 'local.espn.go.com',
				qaVal = $('input[name=edition]:checked', '#edition-searchForm').attr('rel') || 'espn-qa.go.com',
				enviroVal = $('input[name=environment]:checked', '#edition-searchForm').val(),
				url = window.location.href.replace(/.*\/\/[^\/]*/, '') || '/';

				if (enviroVal === 'local'){
					url = 'http://' + localVal + ':8080' + url;
				}
				else{
					url = 'http://' + qaVal + url;
				}
				window.location.href = url;
		}
	});