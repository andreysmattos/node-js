const Product = require("../models/product");

const index = async (req, res) => {
  let { search, featured, company, numericFilters, sort, fields } = req.query;

  let find = {};
  let query;
  let filters;

  if (numericFilters) {
    const options = ["price", "rating"];

    numericFilters.split(",").forEach((item) => {
      let filter = getNumericFilter(item);

      if (filter) {
        let [filterName, filterFind] = getNumericFilter(item);
        if (options.includes(filterName)) {
          find[filterName] = filterFind;
        }
      }
    });
  }

  if (search) find.name = { $regex: search, $options: "i" };
  if (featured) find.featured = featured === "true" ? true : false;
  if (company) find.company = company;
  if (filters) find = { ...find, ...filters };

  query = Product.find(find);

  if (sort) {
    query.sort(sort.replace(",", " "));
  } else {
    query.sort("createdAt");
  }

  if (fields) {
    query.select(fields.replace(",", " "));
  }

  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;

  query.limit(limit);
  query.skip(skip);

  const products = await query;

  res.status(200).json({ hits: products.length, products });
};

const indexStatic = async (req, res) => {
  const products = await Product.find({ featured: true });

  res.status(200).json({ products, qtd: products.length });
};

const getNumericFilter = (filter) => {
  if (!filter) return;

  const operatorMap = {
    "<=": "$lte",
    ">=": "$gte",
    "<": "$lt",
    "=": "$eq",
    ">": "$gt",
  };

  const filterOperators = Object.keys(operatorMap);

  const operator = filterOperators.find((item) => filter.includes(item));

  const mongoOperator = operatorMap[operator];

  const [name, value] = filter.split(operator);

  if (!name || !value) return;

  return [name, { [mongoOperator]: +value }];
};

module.exports = {
  index,
  indexStatic,
};
