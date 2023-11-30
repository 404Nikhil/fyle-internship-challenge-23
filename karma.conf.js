module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false,
      },
      jasmineHtmlReporter: {
        suppressAll: true,
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, '/src/index.html'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true,
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true,
    });
  };
  