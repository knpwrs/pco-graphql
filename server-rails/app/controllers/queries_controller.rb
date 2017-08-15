class QueriesController < ApplicationController
  def create
    begin
      query_string = params[:query]
      query_variables = ensure_hash(params[:variables])
      context = {
        phone_number_loader: Dataloader.new do |ids|
          PhoneNumber.where(id: ids).order_as_specified(id: ids).to_a
        end,
        email_loader: Dataloader.new do |ids|
          Email.where(id: ids).order_as_specified(id: ids).to_a
        end,
        attachment_loader: Dataloader.new do |ids|
          Attachment.where(id: ids).order_as_specified(id: ids).to_a
        end
      }
      result = GraphSchema.execute(query_string, variables: query_variables, context: context)
      render json: result
    rescue => error
      # Match graphql error format for all other errors
      render json: { :errors => [{ :message => error }] }, status: 520
    end
  end

  private

  def ensure_hash(query_variables)
    if query_variables.blank?
      {}
    elsif query_variables.is_a?(String)
      JSON.parse(query_variables)
    else
      query_variables
    end
  end
end
