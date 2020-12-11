const {
  ifError
} = require('assert');
const bodyParser = require('koa-bodyparser');

(async function () {
  const Koa = require('koa');
  const KoaStaticCache = require('koa-static-cache');
  const Router = require('koa-router');
  const BodyParser = require('koa-bodyparser');
  const mysql = require('mysql2/promise');
  const fs = require('fs');

  /** 创建数据库的连接实例对象，注意要使用await来等待异步连接操作
   * mysql.createConnection({
   *  1. host：数据库主机地址
   *  2. user：数据库的用户名
   *  3. password：数据库的密码
   *  4. database:：要使用的数据库
   * })
   */
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'todos'
  })

  // 初始化Koa实例对象 app
  const app = new Koa();

  // 使用KoaStaticCache中间件托管静态资源
  app.use(KoaStaticCache('./static', {
    prefix: '/public',
    gzip: true
  }));

  // 使用BodyParser中间件处理请求正文数据,解析之后会自动挂载到ctx.request.body
  app.use(BodyParser());

  // 初始化路由的实例对象
  const router = new Router();

  /**
   * 开始编写路由
   */

  // 访问/的路由
  router.get('/', async ctx => {
    ctx.body = await fs.readFileSync('./static/index.html').toString();
  })

  // 获取Todos列表数据 API
  router.get('/getList', async ctx => {
    /**
     * 查询数量限制
     * LIMIT - top 10，前10条数据
     * 查询偏移
     * OFFSET
     * 
     * 分页：
     *  把一定的数据按照每页固定的条数去显示，我们需要首先定义每页显示多少
     * 
     * 每页显示3条
     *  1. 0 - 2
     *  2. 3 - 5
     *  3. 6 - 8
     * 每页显示 -> LIMIT
     * 当前的页码 -> OFFSET
     * 
     * 如果页码从1开始，那么对应的记录应该 LIMIT 3 OFFSET （页码-1 * 3）
     * 
     * 总页码
     */

    let page = ctx.query.page || 1; // 这个page页码参数应该由前端来决定是多少
    let pageSize = ctx.query.pageSize || 4; //  每页显示条数
    let type = ctx.query.type || "";
    let keyword = ctx.query.keyword || "";
    page = Number(page);
    pageSize = Number(pageSize);
    let where = `where status = 1 and title like '%${keyword}%' order by done ASC, id DESC`;
    // 查询总记录数
    let sql = `select * from todos ${where}`;
    const [todosAll] = await connection.query(sql);
    // 总的页码 = 总的数据量 / 每页显示条数，注意小数，需要向上取整
    const totalPages = Math.ceil(todosAll.length / pageSize);

    const sql2 = `select * from todos ${where} LIMIT ? OFFSET ?`;
    const [todos] = await connection.query(sql2, [pageSize, (page - 1) * pageSize])
    // 前后端约定：code为0 表示正确，不为0则表示错误
    ctx.body = {
      code: 0,
      data: {
        page, // 页码
        pageSize, // 每页显示条数
        totalPages, // 总页码数
        todos // 列表数据
      }
    };
  })

  // 添加任务 API
  router.post('/add', async ctx => {
    console.log(ctx.request.body);
    let {
      title
    } = ctx.request.body || "";
    if (!title.trim()) {
      ctx.body = {
        code: 1,
        data: '任务标题不能为空'
      }
      return
    }
    let sql = `INSERT INTO todos (title, done) VALUES ('${title}', 0)`;
    let [res] = await connection.query(sql);
    if (res.affectedRows > 0) {
      // 插入成功
      ctx.body = {
        code: 0,
        data: '添加成功'
      }
    } else {
      ctx.body = {
        code: 2,
        data: '添加失败'
      }
    }
  })

  // 删除任务 API
  router.post('/remove', async ctx => {
    console.log(ctx.request.body);
    let {
      id
    } = ctx.request.body;
    // let sql = `DELETE FROM todos WHERE id=${id}`;  DELETE太危险了,别这么干
    let sql = `UPDATE todos SET status=0 WHERE id=${id}`
    let [res] = await connection.query(sql);
    if (res.affectedRows > 0) {
      // 删除成功
      ctx.body = {
        code: 0,
        data: '删除成功'
      }
    } else {
      // 删除失败
      ctx.body = {
        code: 1,
        data: '删除失败'
      }
    }
  })

  // 修改任务状态
  router.post('/change', async ctx => {
    let {
      id,
      done
    } = ctx.request.body;
    console.log(ctx.request.body);
    let sql = `UPDATE todos SET done=${done} WHERE id=${id}`;
    let [res] = await connection.query(sql);
    if (res.affectedRows > 0) {
      // 更新成功
      ctx.body = {
        code: 0,
        data: '更新成功'
      }
    } else {
      // 更新失败
      ctx.body = {
        code: 1,
        data: '更新失败'
      }
    }
  })


  // app中挂载路由系统
  app.use(router.routes());

  app.listen(8888, () => {
    console.log("[+] koa server is listening 0.0.0.0:8888");
  })
})()