'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      '\'Alo \'alo! Welcome to the ' + chalk.red('geb') + ' generator!\nOut of the box I come with gradlew, geb, and webdriver.'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is the name of this project?',
        default: path.basename(process.cwd())
      },
      {
        type: 'input',
        name: 'basePackage',
        message: 'What is the base package for this project?',
        default: 'com.mycompany'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.basePackageDirectory = props.basePackage.replace(/\./g, '/');
    }.bind(this));
  },

  writing: function () {
    var self = this;
    function writeFile(file) {
      self.fs.copy(
        self.templatePath(file),
        self.destinationPath(file)
      );
    }

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );

    writeFile('gradle/wrapper/gradle-wrapper.jar');
    writeFile('gradle/wrapper/gradle-wrapper.properties');
    writeFile('gradle/ci.gradle');
    writeFile('gradle/idea.gradle');
    writeFile('gradle/osSpecificDownloads.gradle');
    writeFile('build.gradle');
    writeFile('gradlew');
    writeFile('gradlew.bat');
    writeFile('src/test/resources/GebConfig.groovy');

    this.fs.copyTpl(
      this.templatePath('src/test/groovy/com/company/tests/LandingPageTest.groovy'),
      this.destinationPath('src/test/groovy/{basePackage}/tests/LandingPageTest.groovy'.replace('{basePackage}', this.props.basePackageDirectory)),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/test/groovy/com/company/component/library/LandingPage.groovy'),
      this.destinationPath('src/test/groovy/{basePackage}/component/library/LandingPage.groovy'.replace('{basePackage}', this.props.basePackageDirectory)),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/test/groovy/com/company/Config.groovy'),
      this.destinationPath('src/test/groovy/{basePackage}/Config.groovy'.replace('{basePackage}', this.props.basePackageDirectory)),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('src/test/resources/com/company/Profiles.groovy'),
      this.destinationPath('src/test/resources/{basePackage}/Profiles.groovy'.replace('{basePackage}', this.props.basePackageDirectory)),
      this.props
    );
  },

  install: function () {
    this.log('\nI\'m finished!\ngive it a try:\n\n./gradlew chromeTest -Dprofile=production');
  }
});
