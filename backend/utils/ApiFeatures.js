class ApiFeatures {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const toExclude = ['page', 'sort', 'limit', 'fields','find'];
        toExclude.forEach(ele => delete queryObj[ele]);

        //Advanced Filtering(if it contains lt,gt,gte,lte)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));

        //to find for searching name
        if (this.queryString.find) {
        this.query = this.query.find({
            name: { $regex: this.queryString.find, $options: 'i' }
        });
    }
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    fieldLimiting() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 4;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
    async getTotalDocs() {
    const cloneQuery = this.query.clone(); // make a safe copy
    cloneQuery.options.skip = undefined;   // remove pagination
    cloneQuery.options.limit = undefined;
    return await cloneQuery.countDocuments();
  }

}
module.exports = ApiFeatures;