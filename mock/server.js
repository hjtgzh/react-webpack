const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Mock = require('mockjs');

app.use(bodyParser.json()); //body-parser 解析json格式数据
app.use(
  bodyParser.urlencoded({
    //此项必须在 bodyParser.json 下面,为参数编码
    extended: true,
  }),
);

const router = express.Router();

// 测试数据
app.get('/', function (req, res) {
  res.send('hello world');
});

// 测试数据
router.use('/test', function (req, res) {
  //调用mock方法模拟数据
  const data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
      },
    ],
  });
  return res.json(data);
});

// table数据
router.use('/table', require('./table'));

app.use('/api', router);

app.listen(3333);
