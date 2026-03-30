import * as allure from "allure-js-commons";
function logMessage(message) {
  console.log(`[LOG]: ${message}`);

}

function loginValidAndInvalidData() {
  allure.owner('Yamuna');
  allure.severity('critical');
  allure.feature('Login');
  allure.story('Valid and Invalid Login');
  allure.description('Verification of both valid and invalid login scenarios');
  allure.tag('smoke');
}

// function loginValidAndInvalidData(testInfo) {
//   testInfo.annotations.push({ type: 'owner', description: 'Yamuna' });
//   testInfo.annotations.push({ type: 'severity', description: 'critical' });
//   testInfo.annotations.push({ type: 'feature', description: 'Login' });
//   testInfo.annotations.push({ type: 'story', description: 'Valid and Invalid Login' });
//   testInfo.annotations.push({ type: 'tag', description: 'smoke' });
//   testInfo.annotations.push({ type: 'description', description: 'Verification of both valid and invalid login scenarios' });

// }

async function isAt(page, URL) {
  const currentURL = await page.url();
  return await currentURL.includes(URL);
}

module.exports = { logMessage, loginValidAndInvalidData, isAt };

