using Newtonsoft.Json;

public class MyRouteRequest
{
    [JsonProperty("payment_method")]
    public string PaymentMethod { get; set; }

    [JsonProperty("amount")]
    public int Amount { get; set; }
}