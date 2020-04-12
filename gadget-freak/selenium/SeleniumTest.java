package gadgetfreaktesting;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumTest {
	public static void main(String[] args) {
		System.setProperty("webdriver.gecko.driver", "C:\\Users\\Boda\\eclipse-workspace\\gadgetfreaktesting\\geckodriver\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.get("https://gadgetfreak-bp3201.c9users.io/");
		WebDriverWait wait = new WebDriverWait(driver, 6);
		driver.manage().window().maximize();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("solid")));
		driver.findElement(By.className("solid")).click();
		checkLogin(driver, wait);
		System.out.println("Login OK");
		checkAddItem(driver, wait);
		System.out.println("AddItem OK");
		checkForum(driver, wait);
		System.out.println("Forum OK");
		//driver.findElement(By.id("login")).click();
	}
	
	public static void checkForum(WebDriver driver, WebDriverWait wait) {
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("forum")));
		driver.findElement(By.id("forum")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("addpost")));
		driver.findElement(By.id("addpost")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("sel")));
		driver.findElement(By.id("sel")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("rand")));
		driver.findElement(By.id("rand")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("textarea")));
		driver.findElement(By.tagName("textarea")).sendKeys("My Galaxy J5 is the best!!!");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("but")));
		driver.findElement(By.id("but")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("mojPost")));
		List<WebElement> we = driver.findElements(By.id("mojPost"));
		we.get(we.size()-1).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("myText")));
		driver.findElement(By.id("myText")).sendKeys("So cooool!");
		driver.findElement(By.id("gumb2")).click();
		driver.findElement(By.id("forum")).click();
		driver.findElement(By.id("deleteMe")).click();
		wait.until(ExpectedConditions.alertIsPresent());
		Alert alert = driver.switchTo().alert();
		alert.accept();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("logout")));
		driver.findElement(By.id("logout")).click();
	}
	
	public static void checkLogin(WebDriver driver, WebDriverWait wait) {
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("login")));
		driver.findElement(By.id("login")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("input")));
		List<WebElement> we = driver.findElements(By.tagName("input"));
		we.get(1).sendKeys("bogdan");
		we.get(2).sendKeys("qwer1234");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("dugme")));
		driver.findElement(By.id("dugme")).click();
	}
	
	public static void checkAddItem(WebDriver driver, WebDriverWait wait) {
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("additem")));
		driver.findElement(By.id("additem")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("select")));
		driver.findElement(By.tagName("select")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("phone")));
		driver.findElement(By.id("phone")).click();
		driver.findElement(By.id("1")).sendKeys("Nokia");
		driver.findElement(By.id("2")).sendKeys("https://images.ctfassets.net/wcfotm6rrl7u/1nQnAFS1oEUSU0aUiUCQWS/68c66c156cf258a5a8b7756f48f600c8/Nokia_130-Hero.png?fm=png");
		driver.findElement(By.id("3")).sendKeys("idk");
		driver.findElement(By.id("4")).sendKeys("1");
		driver.findElement(By.id("5")).sendKeys("other nokia");
		driver.findElement(By.id("6")).sendKeys("idk");
		driver.findElement(By.id("7")).sendKeys("rly");
		driver.findElement(By.id("8")).sendKeys("i");
		driver.findElement(By.id("9")).sendKeys("am");
		driver.findElement(By.id("10")).sendKeys("just");
		driver.findElement(By.id("11")).sendKeys("a");
		driver.findElement(By.id("12")).sendKeys("bot");
		driver.findElement(By.id("13")).sendKeys("doing");
		driver.findElement(By.id("14")).sendKeys("its");
		driver.findElement(By.id("15")).sendKeys("job");
		driver.findElement(By.id("16")).sendKeys("i");
		driver.findElement(By.id("17")).sendKeys("d");
		driver.findElement(By.id("18")).sendKeys("k");
		driver.findElement(By.id("dugme")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("phone")));
		driver.findElement(By.id("phone")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("nokiaPhone")));
		List<WebElement> we = driver.findElements(By.id("nokiaPhone"));
		we.get(we.size()-1).click();
		driver.findElement(By.id("comment")).click();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("rate")));
		driver.findElement(By.id("rate")).click();
		List<WebElement> we2 = driver.findElements(By.tagName("option"));
		we2.get(we2.size()-2).click();
		driver.findElement(By.id("cmt")).sendKeys("Amaziiiing!!!");
		driver.findElement(By.id("sub")).click();
	}
}
