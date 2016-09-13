import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.chrome.ChromeOptions
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.phantomjs.PhantomJSDriver

waiting {
	timeout = 10
}

environments {
	chrome {
    ChromeOptions options = new ChromeOptions()
    options.addArguments("--disable-extensions")
		driver = { new ChromeDriver(options) }
	}

	firefox {
		driver = { new FirefoxDriver() }
	}

   phantomJs {
      driver = { new PhantomJSDriver() }
   }
}
