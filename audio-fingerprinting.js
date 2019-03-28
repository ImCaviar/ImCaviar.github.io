var audioFingerprint = (function () {
	
	var context = null;
	var currentTime = null;
	var oscillator = null;
	var compressor = null;
	var fingerprint = null;
	var callback = null;
	var data = '';

    function run(cb, debug = false) {
        callback = cb;
        try{
            setup();

            oscillator.connect(compressor);
            compressor.connect(context.destination);

            oscillator.start(0);
            context.startRendering();

            context.oncomplete = onComplete;
        }catch (e) {
            if (debug){
                throw e;
            }
        }

        //alert(fingerprint);
        return fingerprint;
    }

	function setup()
	{
		setContext();
		currentTime = context.currentTime;
		setOscillator();
		setCompressor();
	}

	function setContext()
	{
		var audioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
		//缓冲区的声道数、采样帧缓冲区大小、采样率
		context = new audioContext(1, 44100, 44100);
	}

	//生成指定频率的周期性三角波
	function setOscillator()
	{
		oscillator = context.createOscillator();
		oscillator.type = "triangle";
		oscillator.frequency.setValueAtTime(500, currentTime);
	}

	//声音压缩
	function setCompressor()
	{
		compressor = context.createDynamicsCompressor();

        //分贝高于此值时，将会进行压缩。
		setCompressorValueIfDefined('threshold', -50);
		//当超出 threshold 设置的值之后，曲线在哪个点开始朝着 ratio 设置的部分平滑变换。
		setCompressorValueIfDefined('knee', 40);
		//输入增益变化多少来产生 1 dB 的输出。
		setCompressorValueIfDefined('ratio', 12);
		//表示当前压缩器使用的增益压缩值。
		setCompressorValueIfDefined('reduction', -20);
		//降低增益 10 dB 的时间（单位为秒）。
		setCompressorValueIfDefined('attack', 0);
		//提升增益 10 dB 的时间（单位为秒）。
		setCompressorValueIfDefined('release', .25);
	}

	function setCompressorValueIfDefined(item, value)
	{
		if (compressor[item] !== undefined && typeof compressor[item].setValueAtTime === 'function') {
			compressor[item].setValueAtTime(value, context.currentTime);
		}
	}
	
	function onComplete(event)
	{
		generateFingerprints(event);
	    compressor.disconnect();
	}
	
	function generateFingerprints(event)
	{
		var output = null;
		var temp = '';
		for (var i = 4500; 5e3 > i; i++) {
			temp += i.toString() + '\,';
			var channelData = event.renderedBuffer.getChannelData(0)[i];
			output += Math.abs(channelData);
			data += + channelData.toString() + '\,';
		}
		data = temp + '\r\n' + data + '\r\n';
		fingerprint = output.toString();

		if (typeof callback === "function"){
			return callback(fingerprint);
		}
	}

	//导出到csv文件
	function outputcsv(aLink) {
    	var dataType = "\uFEFF";//解决乱码问题
        data = dataType + data;
        var csvData = new Blob([data],{type: 'text/csv'});
        //解决Edge和IE不能下载的问题
        if (window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(csvData,"audiofingerprint.csv");
        }else{
            var urlCreator = window.URL || window.webkitURL;
            var url = urlCreator.createObjectURL(csvData);
            aLink.href =url;
            aLink.click();
        }
    }

    return{
		run:run,
		outputcsv:outputcsv
	};
})();
