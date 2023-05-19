const { populate } = require("../modals/Bootcamps");

const advancedResults =
  (model, populate) => async (req, res, next) => {
    let query;
    //Cpry req.query
    const reqQeury = { ...req.query };

    //Field to exclude
    const removeFields = [
      "select",
      "sort",
      "limit",
      "page",
    ];

    //Loop over removeField and delete the from reqQuery
    removeFields.forEach((param) => delete reqQeury[param]);

    //Create query String
    let queryStr = JSON.stringify(reqQeury);
    //Create operation ($gt,$gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );
    //Finding resource
    query = model.find(JSON.parse(queryStr));
    //SELECT FIELDs
    if (req.query.select) {
      const field = req.query.select.split(",").join(" ");
      query = query.select(field);
    }
    //Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();
    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }
    //Excuing query
    const results = await query;

    //Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
    next();
  };

module.exports = advancedResults;
