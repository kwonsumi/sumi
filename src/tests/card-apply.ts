import { test, describe } from 'node:test';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { useDriver, getDeviceId } from '../../base.js';

const userData = JSON.parse(readFileSync(new URL('../../user-data.json', import.meta.url), 'utf-8'));

describe('롯데카드 카드신청 테스트', () => {
  const { ctx, captureFailure } = useDriver();

  test('1. 앱이 정상적으로 실행되어야 한다', async (t) => {
    try {

      await ctx.driver.activateApp('com.lcacApp');
      await ctx.driver.pause(4000);
  
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('2. 돋보기 아이콘 클릭 (카드 검색 화면으로 이동)', async (t) => {
    try {
      await ctx.driver.pause(2000);
      await ctx.driver.$('//androidx.compose.ui.platform.ComposeView[@resource-id="com.lcacApp:id/cv_main_header"]/android.view.View/android.view.View/android.view.View[5]').click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('3. 전체메뉴에서 신용카드 선택', async (t) => {
    try {
      await ctx.driver.pause(2000);
      await ctx.driver.$(
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("신용카드"))'
      ).click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });
  // test('3. 검색창에 신용카드 입력', async (t) => {
  //   try {
  //     const searchInput = ctx.driver.$('//android.widget.EditText');
  //     await searchInput.click();
  //     await searchInput.setValue('신용카드');
  //     await ctx.driver.$('new UiSelector().className("android.widget.Image").instance(2)').click();
  //     await ctx.driver.pause(2000);
  //   } catch (err) {
  //     await captureFailure(t.name);
  //     throw err;
  //   }
  // });

  // test('4. 검색 결과 클릭', async (t) => {
  //   try {
  //     await ctx.driver.$('//android.view.View[@resource-id="loca-app"]/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.widget.Image[2]').click();
  //     await ctx.driver.pause(2000);
  //   } catch (err) {
  //     await captureFailure(t.name);
  //     throw err;
  //   }
  // });

  // test('5. 신용카드 텍스트 클릭', async (t) => {
  //   try {
  //     await ctx.driver.$('//*[contains(@text,"신용카드") or contains(@content-desc,"신용카드")]').click();
  //     await ctx.driver.pause(2000);
  //   } catch (err) {
  //     await captureFailure(t.name);
  //     throw err;
  //   }
  // });

  test('6. 디지로카 City Edition 카드 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.widget.Button[@text="내멋대로 내맘대로 카드라이프 디지로카 City Edition"]').click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('7. 디지로카 Las Vegas 카드 클릭', async (t) => {
    try {
      await ctx.driver.$(
        'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("크게 쓰면 할인율이 배가 되는 디지로카 Las Vegas 국내외 가맹점 최대 2% 할인 ※ 최대 10만원 할인 가능 무이자 할부 2~3개월"))'
      ).click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('8. 카드 신청 버튼 클릭', async (t) => {
    try {
      await ctx.driver.pause(2000);
      await ctx.driver.$('//android.widget.Button[@text="카드 신청"]').click();
      await ctx.driver.pause(4000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('9. MASTER20,000원 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.view.View[@text="MASTER20,000원"]').click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('10. btn_CD_5_3S_btn_03 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.widget.Button[@resource-id="btn_CD_5_3S_btn_03"]').click();
      await ctx.driver.pause(5000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('11. 주민등록번호 입력', async (t) => {
    try {
      const input1 = ctx.driver.$('//android.widget.EditText[@resource-id="ipt_CD_5_5S_ipt_06"]');
      await input1.waitForExist({ timeout: 15000 });
      await input1.click();
      await input1.setValue(userData.residentNumber1);
      await ctx.driver.pause(1000);
      const input2 = ctx.driver.$('//android.widget.EditText[@resource-id="ipt_CD_5_5S_ipt_07"]');
      await input2.click();
      await ctx.driver.pause(2000);
      for (const digit of userData.residentNumber2) {
        await ctx.driver.$(`android=new UiSelector().resourceId("box_sckeypad_wrap_rrno_1").childSelector(new UiSelector().description("${digit}"))`).click();
        await ctx.driver.pause(300);
      }
      await ctx.driver.pause(4000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('12. 휴대폰번호 입력', async (t) => {
    try {
      const phoneInput = ctx.driver.$('//android.widget.EditText[@resource-id="ipt_CD_5_5S_2B_phoneNum_input"]');
      await phoneInput.waitForExist({ timeout: 5000 });
      await phoneInput.click();
      await phoneInput.clearValue();
      await phoneInput.setValue(userData.residentNumber3);
      await ctx.driver.hideKeyboard();
      await ctx.driver.pause(1000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('14. 통신사 선택 버튼 클릭', async (t) => {
    try {
      const carrierBtn = ctx.driver.$('//android.widget.Button[@resource-id="btn_CD_5_5S_2B_carrier_select"]');
      await carrierBtn.waitForExist({ timeout: 10000 });
      await carrierBtn.click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('15. LGU+ 알뜰폰 선택', async (t) => {
    try {
      const carrier5 = ctx.driver.$('//android.widget.Button[@resource-id="a_CD_5_5S_2B_carrier5"]');
      await carrier5.waitForExist({ timeout: 5000 });
      await carrier5.click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('16. btn_CD_5_5S_btn_02 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.widget.Button[@resource-id="btn_CD_5_5S_btn_02"]').click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });


  test('16. 휴대폰 인증 화면 확인', async (t) => {
    try {
      await ctx.driver.$('//android.view.View[@content-desc="휴대폰 인증"]').click();
      await ctx.driver.pause(2000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });



  test('18. 전체동의하고 인증 버튼 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.widget.Button[@resource-id="btn_ui" and @text="전체동의하고 인증"]').click();
      await ctx.driver.pause(3000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('19. btn_ui 클릭', async (t) => {
    try {
      await ctx.driver.$('//android.widget.Button[@resource-id="btn_ui"]').click();
      await ctx.driver.pause(3000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });

  test('20. 인증번호 입력', async (t) => {
    try {
      const deviceId = await getDeviceId();
      // SMS 수신 대기 30초
      await ctx.driver.pause(30000);
      const smsRaw = execSync(
        `adb -s ${deviceId} shell content query --uri content://sms/inbox --projection "body:date"`,
        { encoding: 'utf-8' }
      );
      // 롯데카드 수신 SMS 중 가장 최신 인증번호 추출
      let latestDate = 0;
      let otp = '';
      for (const line of smsRaw.split('\n')) {
        const otpMatch = line.match(/\[롯데카드\]인증번호\[(\d+)\]/);
        const dateMatch = line.match(/date=(\d+)/);
        if (otpMatch && dateMatch) {
          const date = parseInt(dateMatch[1]);
          if (date > latestDate) {
            latestDate = date;
            otp = otpMatch[1];
          }
        }
      }
      if (!otp) throw new Error('SMS 인증번호를 받지 못했습니다');

      const otpInput = ctx.driver.$('//android.widget.EditText[@resource-id="ipt_CD_5_5S_3B_ipt_01"]');
      await otpInput.waitForExist({ timeout: 10000 });
      await otpInput.click();
      await otpInput.setValue(otp);
      await ctx.driver.pause(1000);
    } catch (err) {
      await captureFailure(t.name);
      throw err;
    }
  });
});
