	$( document ).ready(function() {

		var $sF = $("#edition-searchForm");
		if($sF.length === 0) {
			$('body').prepend(buildSearchForm());
			bindSearchForm();
		}
		else {
			$sF.slideDown('slow');
		}

		function buildSearchForm() {
			return '<form id="edition-searchForm" style="background-color:#FFF; position:fixed; z-index:200; top:0; left:50%; margin-left: -235px; width:440px; text-align:center; padding:15px; height:auto; line-height:25px; box-shadow:0px 0px 5px #333; border:1px solid #888; z-index:1000000000;">'
					+ 'Select environment: '
					+ '<input type="radio" value="local" name="environment" checked="checked" style="display:none" id="local" /> <label for="local">Local</label> | '
					+ '<input type="radio" value="qa" name="environment" style="display:none" id="qa" /> <label for="qa">QA</label><br/><br/>'
					+ 'Select edition:<br/>'
					+ '<input type="radio" value="local.espn.go.com" rel="espn-qa.go.com" name="edition" checked="checked" style="display:none" id="espn" /> <label for="espn">ESPN</label><br/>'
					+ '<input type="radio" value="local.espn.co.uk" rel="qa.espn.co.uk" name="edition" style="display:none" id="uk" /> <label for="uk">UK</label><br/>'
					+ '<input type="radio" value="local.espndeportes.com" rel="qa.espndeportes.com" name="edition" style="display:none" id="deportes" /> <label for="deportes">Deportes</label><br/>'
					+ '<input type="radio" value="local.espn.com.mx" rel="qa.espn.com.mx" name="edition" style="display:none" id="mexico" /> <label for="mexico">Mexico</label><br/>'
					+ '<input type="radio" value="local.espn.com.ar" rel="qa.espn.com.ar" name="edition" style="display:none" id="argentina" /> <label for="argentina">Argentina</label><br/>'
					+ '<input type="radio" value="local.espn.com.ve" rel="qa.espn.com.ve" name="edition" style="display:none" id="venezuela" /> <label for="venezuela">Venezuela</label><br/>'
					+ '<input type="radio" value="local.espn.com.co" rel="qa.espn.com.co" name="edition" style="display:none" id="columbia" /> <label for="columbia">Columbia</label><br/>'
					+ '<input type="radio" value="local.espn.cl" rel="qa.espn.cl" name="edition" style="display:none" id="chile" /> <label for="chile">Chile</label><br/>'
					+ '<input type="submit" value="Submit"/>'
					+ '<input id="edition-closeButton" type="button" value="Close"/>'
				+ '</form>';
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
			var localVal = $('input[name=edition]:checked', '#edition-searchForm').val(),
				qaVal = $('input[name=edition]:checked', '#edition-searchForm').attr('rel'),
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