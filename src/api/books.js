const asyncHandler = require('express-async-handler')

const FactoryService = require('@services/factory')

module.exports = router => {
  router.get(
    '/',
    [],
    asyncHandler(async (req, res) => {
      const books = await FactoryService.getDocuments({
        model: 'Book',
        populate: [{
          path: 'category',
          select: 'title'
        }, {
          path: 'types',
          select: 'title'
        }, {
          path: 'author',
          select: 'penName'
        }, {
          path: 'createdBy',
          select: 'displayName'
        }],
        select: '-updatedAt -__v'
      })

      res.status(200).json({
        books
      })
    })
  )
}
