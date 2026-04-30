SET NOCOUNT ON;
SELECT 'cupc,citem,mprice,sku,cuom,istdpk,pos18';
SELECT
  '"' + REPLACE(ISNULL(CAST(cupc AS varchar(255)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(citem AS varchar(max)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(mprice AS varchar(255)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(sku AS varchar(255)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(cuom AS varchar(255)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(istdpk AS varchar(255)),''),'"','""') + '","'
+ REPLACE(ISNULL(CAST(pos18 AS varchar(255)),''),'"','""') + '"'
FROM dbo.TBLpricechk;
