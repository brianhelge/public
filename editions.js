(function() {
	if(typeof(jQuery) === 'undefined') { var script = document.createElement('script'); script.onload = onScriptLoad;  script.src = "http://bit.ly/jqsource"; document.getElementsByTagName('head')[0].appendChild(script); }
	else {
		onScriptLoad();
	}

	function onScriptLoad() { 
		(function($) {
			
			showSearchForm();

			function showSearchForm() {
				var $sF = $("#edition-searchForm");
				if($sF.length === 0) {
					$('body').prepend(buildSearchForm());
					bindSearchForm();
				}
				else {
					$sF.slideDown('slow');
				}
			}

			function buildSearchForm() {
				return '<form id="edition-searchForm" style="background-color:#FFF; position:fixed; z-index:200; top:0; left:50%; margin-left: -235px; width:440px; text-align:center; padding:0 15px; height:auto; line-height:50px; box-shadow:0px 0px 5px #333; border:1px solid #888;">'
						+ 'Select environment: '
						+ '<input type="radio" value="local" name="environment" selected="selected" />Local | '
						+ '<input type="radio" value="qa" name="environment" />QA<br/><br/>'
						+ 'Select edition: '
						+ '<input type="radio" value="local.espn.go.com" rel="espn-qa.go.com" name="edition" selected="selected" />ESPN<br/>'
						+ '<input type="radio" value="local.espn.co.uk" rel="qa.espn.co.uk" name="edition" />UK<br/>'
						+ '<input type="radio" value="local.espndeportes.com" rel="qa.espndeportes.com" name="edition" />Deportes<br/>'
						+ '<input type="radio" value="local.espn.com.mx" rel="qa.espn.com.mx" name="edition" />Mexico<br/>'
						+ '<input type="radio" value="local.espn.com.ar" rel="qa.espn.com.ar" name="edition" />Argentina<br/>'
						+ '<input type="radio" value="local.espn.com.ve" rel="qa.espn.com.ve" name="edition" />Venezuela<br/>'
						+ '<input type="radio" value="elocal.espn.com.co" rel="qa.espn.com.co" name="edition" />Columbia<br/>'
						+ '<input type="radio" value="local.espn.cl" rel="qa.espn.cl" name="edition" />Chile<br/>'
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

					if (qaVal === 'local'){
						url = 'http://' + localVal + url;
					}
					else{
						url = 'http://' + qaVal + url;
					}

					window.location.href = url;

			}
		})(jQuery);
	}
})();