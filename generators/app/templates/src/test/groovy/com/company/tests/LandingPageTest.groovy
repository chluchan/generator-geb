package <%= basePackage %>.tests

import <%= basePackage %>.component.library.LandingPage
import geb.spock.GebReportingSpec
import spock.lang.Stepwise

@Stepwise
class LandingPageTest extends GebReportingSpec {
   def "should be able to launch Google"() {
      when: "you open Google"
      to LandingPage

      then: "you are at google"
      at LandingPage
      search.present
   }
}
