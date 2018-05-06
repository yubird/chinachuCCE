(function() {
	
	switch (request.method) {
		case 'GET':
			response.head(200);
			response.end(JSON.stringify(data.rules, null, '  '));
			return;
		
		case 'POST':
			var newRule = request.query;
			if (typeof newRule === 'string') {
				try {
					newRule = JSON.parse(request.query);
				} catch (e) {
					return response.error(400);
				}
			}
			if (JSON.stringify(newRule) === '{}') {
				response.error(400);
			} else {
				if (newRule.isEnabled === false) {
					newRule.isDisabled = true;
				}
				delete newRule.isEnabled;
				
				data.rules.push(newRule);
				fs.writeFileSync(define.RULES_FILE, JSON.stringify(data.rules, null, '  '));
				
				response.head(201);
				response.end(JSON.stringify(newRule));
			}
			return;
	}

})();
