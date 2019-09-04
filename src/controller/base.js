module.exports = class extends think.Controller {
  __before() {

  }

  checkParams(data,keyArray){
    let error = [];
    for(let key of keyArray){
      if(!data[key]){
        error.push(`${key}为必填项`);
      }
    }
    return error.join("、");
  }
};
