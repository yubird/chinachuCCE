/*
Usushio では使わない
*/
(function() {

	var tmp = decodeURIComponent(request.param.c);
	if (tmp.match('.ts')) {
		var file = {
			path: tmp.replace('/##/g', '/')
		};
	} else {
		var file = {
			path: '/mnt/anime/' + tmp.replace(/##/g, '/')
		};
	}
	util.log('content::'+file.path);

	//var readStream = fs.createReadStream(file.path, {});
	if (!fs.existsSync(file.path)) {
		return response.error(404);
	}

	switch (request.type) {
		case 'xspf':
		case 'm2ts':
			return;

		case 'webm':

			var args = [];

			args.push('-re');
			args.push('-i', file.path);
			args.push('-threads', '10');
			args.push(
				'-s', '1280x720',
				'-r', '24000/1001',
				'-cmp', 'chroma',
				'-acodec', 'libopus',
				'-ar', '48000',
				'-ab', '128k',
				'-c:v', 'libvpx-vp9',
				'-deadline', 'realtime',
				'-speed', '4',
				'-cpu-used', '-6',
				'-crf', '8',
				'-qmin', '4',
				'-qmax', '33',
				'-g', '150',
				'-b:v', '2280k',
				'-minrate', '128k',
				'-maxrate', '4096k'
			);

			args.push('-y', '-f', 'webm', 'pipe:1');

			let stream = null;;

			request.once('close', () => {

				if (stream) {
					stream.unpipe();
					stream.req.abort();
				}
			});
			
			// get stream
			var ffmpeg = child_process.spawn(
				'/usr/local/bin/ffmpeg',
				args
			);
			children.push(ffmpeg.pid);
			util.log('SPAWN: ffmpeg ' + args.join(' ') + ' (pid=' + ffmpeg.pid + ')');

			request.on('close', function() {
				ffmpeg.stdout.removeAllListeners('data');
				ffmpeg.stderr.removeAllListeners('data');
				ffmpeg.kill('SIGKILL');
			});

			// * -> response
			ffmpeg.stdout.pipe(response);

			// ts - *
			//readStream(ffmpeg.stdin);

			ffmpeg.stderr.on('data', function(data) {
				data = data.toString();
				util.log(data);
				util.log('#ffmpeg: ' + data.replace(/\n/g, ' ').trim());
			});

			ffmpeg.on('exit', function(code) {
				response.end();
			});

			return;
	}//<--switch

}());
