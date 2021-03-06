var regulaFalsi = function(){
	return {
		situation: function(){
			return 'coming soon...';
		},
		pseudoCode:function(){
			return 'coming soon...';
		},
		cal:function(f, x0, x1, TOL) {
			// Like 'Secant method' but support false position
			var objResult = { isSuccess:false, result:'' };
			var x2 = 0;

			var prevX2 = 0;
			var fiveSignificantFigures = 0;

			if (typeof f === "function") {
				var fn_x0 = null;
				var fn_x1 = null;
				var fn_x2 = null;
				var iteration = 1;

				console.log('|Iteration|  x0  |  x1  |  x2  | f(x0) | f(x1) | f(x2) |');
				while(true){
					fn_x0 = f(parseFloat(x0));
					fn_x1 = f(parseFloat(x1))
					x2 = x1 - (((fn_x1*parseFloat(x0)) - (fn_x1*parseFloat(x1))) / ( fn_x0 - fn_x1 ));
					fn_x2 = f(parseFloat(x2));

					if(parseFloat(prevX2).toFixed(10)==parseFloat(x2).toFixed(10)) 
						fiveSignificantFigures += 1;
					else fiveSignificantFigures = 0;

					console.log('| ' + 
						iteration + ' | ' + 
						x0.toFixed(10) + ' | ' + 
						x1.toFixed(10) + ' | ' + 
						x2.toFixed(10) + ' | ' + 
						fn_x0.toFixed(10) + ' | ' + 
						fn_x1.toFixed(10) + ' | ' + 
						fn_x2.toFixed(10) + ' |');

					if(TOL==null){
						if(fiveSignificantFigures==5) {
							objResult.isSuccess = true;
							objResult.result = parseFloat(x2).toFixed(10);
							break;
						}
					} else {
						if(Math.abs(fn_x2) < parseFloat(TOL)) {
							objResult.isSuccess = true;
							objResult.result = x2;
							break;
						}
					}

					if((fn_x2 < 0 && fn_x0 > 0) || (fn_x2 > 0 && fn_x0 < 0)) {
						x1 = x2;
					} else {
						x0 = x2;
					}

					iteration++;
					prevX2 = x2;
				}
			} else {
				objResult.isSuccess = false;
				objResult.result += ' - Error in Regula Falsi method : ' + f + ' is not function';
				console.log(' - Error in Regula Falsi method : ' + f + ' is not function');
			}

			return objResult;
		}
	};
};

module.exports = regulaFalsi();
