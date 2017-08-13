class QueriesController < ApplicationController
  def create
    begin
      query_string = params[:query]
      query_variables = ensure_hash(params[:variables])
      result = GraphSchema.execute(query_string, variables: query_variables)
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
