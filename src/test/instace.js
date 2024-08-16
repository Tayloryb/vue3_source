const template = 'http://{instance_id}-sd.test-ultrongw.woa.com';
const targetUrl = 'https://lightai-pgame-refine-v1-sd.test-ultrongw.woa.com';

// 将模板中的特殊字符转义
const escapedTemplate = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// 将 {instance_id} 替换为捕获组，并将 http 可选地匹配 https
const regexString = escapedTemplate.replace('http', 'https?').replace('\\{instance_id\\}', '([\\w.-]+)');

// 创建正则表达式对象
const regex = new RegExp(regexString);

// 匹配目标 URL 并提取 instance_id
const match = targetUrl.match(regex);
let instanceId = null;
if (match && match[1]) {
  instanceId = match[1];
}

if (instanceId) {
  console.log(`Instance ID: ${instanceId}`);
} else {
  console.log('No instance ID found.');
}
