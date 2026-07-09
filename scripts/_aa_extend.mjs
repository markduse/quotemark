import { chromium } from 'playwright';
import fs from 'node:fs';
const GRID = 'scripts/amam_iul_grid.json';
const MAGENT = 'http://insuranceapplication.com/cgi/webapp/Magentinfo.aspx?agentnumber=0001165985&company=110';
const CLASSES = [['Male','Non-Tobacco','MNS'],['Male','Tobacco','MS'],['Female','Non-Tobacco','FNS'],['Female','Tobacco','FS']];
const AGES = [18,25,30,35,40,45,50,55,60,65,70,75];
const NEW_FACES = [300000, 400000, 450000];   // extend beyond existing 50/100/250k
const sleep = ms => new Promise(r=>setTimeout(r,ms));
const num = s => { const n=Number(String(s).replace(/[$,]/g,'')); return Number.isFinite(n)&&n>0?n:null; };

const grid = JSON.parse(fs.readFileSync(GRID,'utf8'));
const browser = await chromium.launch({headless:true});
let page = await browser.newPage();
async function enter(){
  await page.goto(MAGENT,{waitUntil:'domcontentloaded'});
  await page.selectOption('select[name=DropDownList2]',{label:'Intelligent Choice'});
  await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}), page.click('input[name=ImageButton3]')]);
  await page.waitForSelector('select[name=scrState]',{timeout:20000});
  await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}).catch(()=>{}), page.selectOption('select[name=scrState]','TX')]);
  await page.waitForSelector('select[name=scrSex]',{timeout:20000});
}
// returns {prem} or {reject:true}
async function q(sex,tob,age,face){
  await page.selectOption('select[name=scrSex]',sex);
  await page.selectOption('select[name=scrPremClass]',tob);
  await page.selectOption('select[name=scrdobAge]',String(age));
  await page.check('input[name=scrHealthPlan][value=N]').catch(()=>{});
  const cov=page.locator('input[name=scrCoverage]'); await cov.fill(''); await cov.fill(String(face));
  await page.locator('input[name=scrPremium]').fill('');
  await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded'}), page.click('input[name=ImageButton1]')]);
  await sleep(350);
  const formHere=await page.locator('select[name=scrSex]').count();
  if(!formHere) return {reject:true};
  return {prem:num(await page.inputValue('input[name=scrPremium]').catch(()=>''))};
}
await enter();
const maxByAgeCls={};
for(const [sex,tob,k] of CLASSES){
  for(const age of AGES){
    let curMax=250000; // existing ceiling
    for(const face of NEW_FACES){
      if(grid[k]?.[age]?.[face]!=null){ curMax=face; continue; }
      let r=null;
      for(let att=0; att<2 && r==null; att++){ try{ r=await q(sex,tob,age,face); }catch(e){ await enter(); } }
      if(r && r.reject){ await enter(); break; }        // over max for this age — higher will also reject
      if(r && r.prem!=null){ grid[k][age][face]=r.prem; curMax=face; }
      else { await enter(); break; }
      await sleep(400);
    }
    maxByAgeCls[k+'|'+age]=curMax;
    fs.writeFileSync(GRID, JSON.stringify(grid,null,2));
  }
  console.log(k, 'max-by-age:', AGES.map(a=>a+':'+(maxByAgeCls[k+'|'+a]/1000)+'k').join(' '));
}
fs.writeFileSync('scripts/amam_iul_maxface.json', JSON.stringify(maxByAgeCls,null,2));
await browser.close();
console.log('extend done');
