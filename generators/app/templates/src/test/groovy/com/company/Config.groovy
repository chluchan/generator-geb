package <%= basePackage %>

class Config {
   private static def CONFIG_LOCATION = '<%= basePackageDirectory %>/Profiles.groovy'

   public static final def CONFIG = parseConfig().profiles[profile()]

   Config() {

   }

   private static def parseConfig() {
      def configFile = new Config().getClass().getClassLoader().getResource(CONFIG_LOCATION).toExternalForm().toURI().toURL()
      new ConfigSlurper().parse(configFile)
   }

   private static def profile() {
      System.getProperty("profile", "production")
   }
}
