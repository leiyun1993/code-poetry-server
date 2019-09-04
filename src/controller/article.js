const Base = require('./base.js');
const config = require("../config/config.js");

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }

  async getArticleListAction() {
    if (this.isGet) {
      let articleModel = this.model("cp_article");
      let res = await articleModel.page(this.get("page") || 1, this.get("size") || 3).where({
        type: 1
      }).order('id DESC').countSelect();
      if (think.isEmpty(res.data)) {
        this.success({
          list: [],
          total: res.count
        })
      } else {
        this.success({
          list: res.data,
          total: res.count
        })
      }

    } else {
      this.status = 404;
    }

  }

  async addArticleAction() {
    if (this.isPost) {
      let params = {
        name: this.post("name"),
        desc: this.post("desc"),
        html: this.post("html"),
        type: this.post("type"),
        add_time: String(Date.now())
      }
      let error = this.checkParams(params, ["name", "desc", "html"]);
      if (!error) {
        let articleModel = this.model("cp_article");
        let res = await articleModel.add(params);
        this.success(res);
      } else {
        this.fail(config.BASE_ERROE_CODE, error, {});
      }
    } else {
      this.status = 404;
    }
  }

  async getIndexArticleAction() {
    if (this.isGet) {
      let articleModel = this.model("cp_article");
      let res = await articleModel.where({
        type: 2
      }).order("RAND()").limit(1).select();
      if (think.isEmpty(res)) {
        this.success({});
      } else {
        this.success(res[0]);
      }
    } else {
      this.status = 404;
    }
  }

  async getArticleAction() {
    if (this.isGet) {
      let params = {
        id: this.get("id")
      }
      let error = this.checkParams(params, ["id"]);
      if (!error) {
        let articleModel = this.model("cp_article");
        let res = await articleModel.where(params).find();
        this.success(res);
      } else {
        this.fail(config.BASE_ERROE_CODE, error, {});
      }
    } else {
      this.status = 404;
    }
  }
};