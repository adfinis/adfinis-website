const TABLE = 'components_sections_icon_card_section_with_relations';

module.exports = {
  async up(knex) {
    const hasTable = await knex.schema.hasTable(TABLE);
    if (!hasTable) {
      // Fresh DB: schema sync will create the table with `body` directly
      return;
    }

    const hasTitle = await knex.schema.hasColumn(TABLE, 'title');
    const hasBody = await knex.schema.hasColumn(TABLE, 'body');

    if (hasTitle && !hasBody) {
      await knex.schema.alterTable(TABLE, (t) => {
        t.renameColumn('title', 'body');
      });
    }
    // Otherwise already migrated / re-run: no-op
  },
};
