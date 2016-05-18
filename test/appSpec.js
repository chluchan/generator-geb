'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-geb:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({basePackage: 'com.mycompany'})
      .toPromise();
  });

  it('creates your gradle wrapper and build files', function () {
    assert.file([
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties',
      'gradle/ci.gradle',
      'gradle/idea.gradle',
      'gradle/osSpecificDownloads.gradle',
      '.gitignore',
      '.editorconfig',
      'build.gradle',
      'gradlew',
      'gradlew.bat',
      'src/test/resources/GebConfig.groovy',
      'src/test/groovy/com/mycompany/tests/LandingPageTest.groovy',
      'src/test/groovy/com/mycompany/component/library/LandingPage.groovy',
      'src/test/groovy/com/mycompany/Config.groovy',
      'src/test/resources/com/mycompany/Profiles.groovy'
    ]);
  });
});
