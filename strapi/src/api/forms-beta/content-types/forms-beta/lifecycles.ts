export default {
  /**
   * @see https://docs.strapi.io/cms/backend-customization/models#declarative-and-programmatic-usage
   */
  async afterCreate(event) {
    try {
      await strapi.plugins["email"].services.email.send({
        to: process.env.MAILGUN_TO,
        subject: `New form request: ${event.result.type} - ${event.result.first_name} ${event.result.last_name}`,
        html: `<table>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>documentId</td>
          <td>${event.result.documentId}</td>
        </tr>
        <tr>
          <td>type</td>
          <td>${event.result.type}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>${event.result.email}</td>
        </tr>
        <tr>
          <td>first_name</td>
          <td>${event.result.first_name}</td>
        </tr>
        <tr>
          <td>last_name</td>
          <td>${event.result.last_name}</td>
        </tr>
        <tr>
          <td>phone_number</td>
          <td>${event.result.phone_number}</td>
        </tr>
        <tr>
          <td>company_name</td>
          <td>${event.result.company_name}</td>
        </tr>
        <tr>
          <td>job_function</td>
          <td>${event.result.job_function}</td>
        </tr>
        <tr>
          <td>privacy_policy</td>
          <td>${event.result.privacy_policy}</td>
        </tr>
        <tr>
          <td>captcha</td>
          <td>${event.result.captcha}</td>
        </tr>
        <tr>
          <td>message</td>
          <td>${event.result.message}</td>
        </tr>
        <tr>
          <td>is_created_at</td>
          <td>${event.result.is_created_at}</td>
        </tr>
        <tr>
          <td>createdAt</td>
          <td>${event.result.createdAt}</td>
        </tr>
        <tr>
          <td>updatedAt</td>
          <td>${event.result.updatedAt}</td>
        </tr>
        <tr>
          <td>publishedAt</td>
          <td>${event.result.publishedAt}</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>${event.result.locale}</td>
        </tr>
      </table>`,
      });
    } catch (error) {
      console.error(
        "Error sending email:",
        error,
        JSON.stringify(event.result),
      );
    }
  },
};
